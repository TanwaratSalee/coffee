import { useEffect } from 'react'
import supabase from '../../lib/supabase';

export default function Home() {

  useEffect(()=> {
    console.log('useEffect');
    
    const db = async () => {
      console.log('444');
      // const { data: menu, error } = await supabase.from('menu').select('*')
      const { data, error } = await supabase.from('group').select(`
  id, 
  name, 
  menu ( id, name )
`)
      console.log("data",data);
      
    }
    db()
  },[])

  return (
    <div>
    </div>
  )
}
