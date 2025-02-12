// pages/htmlPage.js
export default function HtmlPage() {
  const htmlContent = `
  <div>
    <h1>Welcome to My HTML Page</h1>
    <p>This is rendered from an HTML file.</p>
  </div>
`;

  return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
}
