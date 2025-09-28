import React from 'react';

export default {
	process(src, filename) {
		const componentName = filename
			.split('/')
			.pop()
			.replace(/\.svg$/, '')
			.replace(/[^a-zA-Z0-9]/g, '')
			.replace(/^./, (str) => str.toUpperCase());

		return {
			code: `
        import React from 'react';
        function ${componentName}(props) {
          return React.createElement('svg', props, '${componentName}');
        }
        export default ${componentName};
      `,
		};
	},
};
