import WelcomeHeader from '../components/WelcomeHeader';

function PurchaseBookPage() {
  return (
    <>
      <WelcomeHeader />
      <h2>Purchase Book</h2>
      <div>
        <h3>Book Title</h3>
        <h4>Author</h4>
        <h4>Price</h4>
        <button className="btn btn-info">Add to cart </button>
      </div>
    </>
  );
}
export default PurchaseBookPage;
