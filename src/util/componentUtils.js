// src/utils/componentUtils.js
export const componentUtils = {
    getAvailableComponents() {
        const components = import.meta.glob('/src/components/**/*.jsx', { eager: true });
        return Object.keys(components);
    },

    loadComponent(path) {
        const components = import.meta.glob('/src/components/**/*.jsx', { eager: true });
        return components[path]?.default;
    }
};
