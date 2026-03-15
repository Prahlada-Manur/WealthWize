import CategoriesForm from "./CategoriesForm";
import CategoriesList from "./CategoriesList";

//--------------------------------------------------------------------
export default function Categories() {
  //----------------------------------------------------------------------
  return (
    <div className="min-h-screen px-4 flex justify-center">
      <div className="w-full max-w-md space-y-6">
      <h3 className="text-center font-semibold text-3xl pt-5">Categories </h3>
      <CategoriesForm />
      <CategoriesList />
      </div>
    </div>
  );
}
