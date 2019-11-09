export default  {
	gekaaptebrieven: async function() { return await import('docere-project-gekaaptebrieven') },
	utrechtpsalter: async function() { return await import('docere-project-utrechtpsalter') },
	vangogh: async function() { return await import('docere-project-vangogh') },
} as Record<string, () => Promise<{ default: DocereConfigData }>>