#!/bin/bash

# Exit on error
set -e

# Define variables
API_VERSION=${API_VERSION:-"latest"}
API_BASE_URL=${API_BASE_URL:-"https://1click.chaindefuser.com/docs/v0"}
SPEC_URL="${API_BASE_URL}/openapi.json"

echo "Fetching OpenAPI specification for version: ${API_VERSION}"
curl -s "${SPEC_URL}" > openapi.json

# Check if OpenAPI Generator CLI is available and install if needed
if ! command -v npx @openapitools/openapi-generator-cli > /dev/null; then
    echo "Installing OpenAPI Generator CLI..."
    npm install -g @openapitools/openapi-generator-cli
fi

# Generate TypeScript SDK
echo "Generating TypeScript SDK..."
npx @openapitools/openapi-generator-cli generate \
    -i openapi.json \
    -g typescript-fetch \
    -o . \
    --additional-properties=npmName=@defuse-protocol/one-click-sdk,supportsES6=true,withInterfaces=true,typescriptThreePlus=true

# Update the version in package.json if API_VERSION matches semver pattern (vX.Y.Z)
if [[ $API_VERSION =~ ^v[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
    VERSION_NUMBER=${API_VERSION:1}  # Remove the 'v' prefix
    echo "Updating package.json version to ${VERSION_NUMBER}"
    npm version ${VERSION_NUMBER} --no-git-tag-version
fi

# Build the SDK
echo "Building the SDK..."
npm install
npm run build

# Commit all changes before publishing
echo "Committing changes..."
git config user.email "action@github.com"
git config user.name "GitHub Action"
git add .
git commit -m "Generate TypeScript SDK for version ${API_VERSION}" || echo "No changes to commit"

# Publish to npm
echo "Publishing to npm..."
echo "//registry.npmjs.org/:_authToken=${NPM_TOKEN}" > .npmrc
npm publish --access public
rm -f .npmrc

echo "TypeScript SDK regeneration process completed for API version: ${API_VERSION}" 