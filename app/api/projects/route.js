import { NextResponse } from 'next/server';
import { Client } from 'pg';
export async function  GET(){
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
    });
    try{
        await client.connect();
        const result= await client.query('SELECT * from projects');
        return NextResponse.json(result.rows);
    } catch(err){
        return NextResponse.json({ status: 'error', error: err.message });
    } finally {
        await client.end();
    }
}