const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '../..');

const config = getDefaultConfig(projectRoot);

// Watch all files within the monorepo root
config.watchFolders = [workspaceRoot];

// Let Metro resolve packages globally within the monorepo
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(workspaceRoot, 'node_modules'),
];

// Force Metro to resolve (sub)dependencies only from the nodeModulesPaths above
config.resolver.disableHierarchicalLookup = true;

module.exports = config;
