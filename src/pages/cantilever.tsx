import Layout from "../components/Layout";
import GermanCantilever from "../models/cantilevers/GermanCantilever";

const CantileverPage = () => {
  const cantilever = new GermanCantilever("TDP<2.2",4500,1600,-150,262,262,0,0,4,400,0,2150);
  return(
    <Layout>
      <h5 className="font-bold text-secondary-dark">Cantilever</h5>
      <p>{cantilever.getViaAxis().x}</p>
      <p>{cantilever.getViaAxis().y}</p>
      <p>{cantilever.getCwAxis().x}</p>
      <p>{cantilever.getCwAxis().y}</p>
      <p>{cantilever.getMwAxis().x}</p>
      <p>{cantilever.getMwAxis().y}</p>

      <div className="w-full h-[400px] border-2 border-gray-light rounded-xl">

      </div>
    </Layout>
  );
}

export default CantileverPage;
