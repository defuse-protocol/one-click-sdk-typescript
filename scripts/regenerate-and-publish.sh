#!/bin/bash

# Exit on error
set -e

# Define variables
VERSION_NUMBER=${API_VERSION#v}  # Remove leading 'v' if present

echo "Version ${VERSION_NUMBER} generation..."
# Install tools
npm install -g pnpm
pnpm install

# Generate TypeScript SDK
echo "Generating TypeScript SDK..."
pnpm run generate:fresh

# Append API version to package version
echo "Updating package.json version to ${VERSION_NUMBER}"
npm version "${VERSION_NUMBER}" --no-git-tag-version

# Build the SDK
echo "Building the SDK..."
npm install
npm run build

# Commit all changes before publishing.
# `main` is protected by a ruleset requiring every change to arrive via a PR,
# so we commit onto a dedicated release branch instead of onto main directly.
echo "Committing changes..."
git config user.email "action@github.com"
git config user.name "GitHub Action"

RELEASE_BRANCH="release/${VERSION_NUMBER}"
git checkout -b "${RELEASE_BRANCH}"
git add .
git commit -m "Release: ${VERSION_NUMBER} version" || echo "No changes to commit"

# Publish to npm
echo "Publishing to npm..."
npm publish --access public

# Open a PR for the release branch and let GitHub merge it automatically once
# the ruleset's requirements are met. We push the branch (allowed) rather than
# main (rejected), then rely on auto-merge to land the commit on main.
echo "Opening release PR..."
git push -u origin "${RELEASE_BRANCH}"
gh pr create --base main --head "${RELEASE_BRANCH}" --fill
gh pr merge --auto --squash "${RELEASE_BRANCH}"

echo "TypeScript SDK regeneration process completed for API version: ${VERSION_NUMBER}"
