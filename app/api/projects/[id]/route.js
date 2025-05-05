import { NextResponse } from "next/server";
import { Client } from "pg";

export async function GET(req,context) {
  const {params}=await context;
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    const projectId = Number(params.id);
    if(isNaN(projectId)){
      return NextResponse.json({status:'error',message:'Invalid Project Id'},{status:400});
    }
    await client.connect();

    const result = await client.query(
      `SELECT * FROM projects 
       LEFT JOIN details ON projects.id = details.projects_id 
       LEFT JOIN roles ON projects.id = roles.projects_id 
       WHERE projects.id = $1`, 
      [projectId]
    );    

    if (result.rows.length === 0) {
      return NextResponse.json({ status: 'error', message: 'Project not found' }, { status: 404 });
    }  

    return NextResponse.json({ status: 'success', project: result.rows[0] });

  } catch (err) {
    return NextResponse.json({ status: 'error', error: err.message });
  } finally {
    await client.end();
  }
}
