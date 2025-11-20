/* eslint-disable @typescript-eslint/no-explicit-any */
import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, name, phone } = body;

    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true, 
    });

    if (authError) throw authError;

    if (authData.user) {
      const { error: dbError } = await supabaseAdmin
        .from('clients')
        .insert({
          id: authData.user.id,
          name: name,
          phone_number: phone,
        });

      if (dbError) throw dbError;
    }

    return NextResponse.json({ message: 'Client created successfully!' });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}