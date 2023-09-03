import * as path from 'path';
import slash from 'slash';
import AdminJS from 'adminjs';

const generateUserComponentEntry = (admin, entryPath) => {
  const { env = {} } = admin.options;
  admin.componentLoader.__unsafe_merge(AdminJS.__unsafe_staticComponentLoader);
  const components = admin.componentLoader.getComponents();

  const absoluteEntryPath = path.resolve(entryPath);

  const setupPart = 'AdminJS.UserComponents = {}\n';

  const envPart = Object.keys(env)
    .map((envKey) => `AdminJS.env.${envKey} = ${JSON.stringify(env[envKey])}\n`)
    .join('');
  const componentsPart = Object.keys(components || {})
    .map((componentId) => {
      const componentUrl = path.relative(absoluteEntryPath, components[componentId]);
      return [
        `import ${componentId} from '${slash(componentUrl)}'`,
        `AdminJS.UserComponents.${componentId} = ${componentId}`,
      ].join('\n');
    })
    .join('\n');
  return setupPart + envPart + componentsPart;
};

export default generateUserComponentEntry;
