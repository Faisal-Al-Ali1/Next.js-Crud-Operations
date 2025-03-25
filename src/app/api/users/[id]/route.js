import { getUserById, updateUser, deleteUser } from '@/lib/db';

export async function GET(request, { params }) {
  try {
    const user = await getUserById(params.id);
    
    if (!user) {
      return Response.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    
    return Response.json(user);
  } catch (error) {
    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const { name, email } = await request.json();
    
    if (!name || !email) {
      return Response.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }

    const updatedUser = await updateUser(params.id, name, email);
    return Response.json(updatedUser);
  } catch (error) {
    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const deletedUser = await deleteUser(params.id);
    return Response.json(deletedUser);
  } catch (error) {
    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }
}