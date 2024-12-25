import { Switch, Route } from "wouter";
import { Layout } from "@/components/Layout";
import { Home } from "@/pages/Home";
import { Content } from "@/pages/Content";

function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/:section/:slug?" component={Content} />
      </Switch>
    </Layout>
  );
}

export default App;
