import './loading-page.css';

function LoadingPage(): JSX.Element {
  return (
    <div className="spinner-wrapper">
      <p>Loading...</p>
      <div className="spinner"></div>
    </div>
  );
}

export default LoadingPage;
