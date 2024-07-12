export const getEnvironmentVar = (code: string) => {
    const env = process.env[`VUE_APP_${code}`]

    if (!env) return ''
    return env
};
