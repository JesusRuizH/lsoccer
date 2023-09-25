import { Layout } from "../../components/Layout";
import { LoginForm } from "../../components/loginForm";


function NewLogin() {
  return ( 
    <Layout>
      <div className="grid place-items-center h-5/6">
        <LoginForm />
      </div>
    </Layout>
    );
}

export default NewLogin