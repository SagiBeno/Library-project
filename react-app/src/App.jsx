import { useState, useEffect } from "react";
import supabase from "./supabase-test/supabase";

export default function App(props) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    (async () => {
      const felhasznalok = await supabase
        .from("library_project_junction")
        .select("*")
      setUsers(felhasznalok.data);
    })().catch(console.warn);
  }, []);

  return <>
    {JSON.stringify(users)}
    
  </>;
}
