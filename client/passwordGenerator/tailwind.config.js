export default{
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'custom-bg': "url('/path/to/your/image.jpg')", // Adjust the path accordingly
      },
    },
  },
  plugins: [],
};
