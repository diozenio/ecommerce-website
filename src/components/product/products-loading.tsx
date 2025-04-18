import Spinner from "../common/spinner";

export default function ProductsLoading() {
  return (
    <div className="flex justify-center items-center py-20">
      <Spinner />
    </div>
  );
}
