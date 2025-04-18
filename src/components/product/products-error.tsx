interface Props {
  error: unknown;
}

export default function ProductsError({ error }: Props) {
  return (
    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative my-6">
      <p>Erro ao carregar produtos: {(error as Error).message}</p>
    </div>
  );
}
