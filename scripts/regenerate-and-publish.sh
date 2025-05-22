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

# Commit all changes before publishing
echo "Committing changes..."
git config user.email "action@github.com"
git config user.name "GitHub Action"
git add .
git commit -m "Release: ${VERSION_NUMBER} version" || echo "No changes to commit"

# Publish to npm
echo "Publishing to npm..."
echo "//registry.npmjs.org/:_authToken=${NPM_TOKEN}" > .npmrc
npm publish --access public
rm -f .npmrc

# Push changes to the repository
echo "Pushing changes to remote..."
git push

echo "TypeScript SDK regeneration process completed for API version: ${VERSION_NUMBER}"
