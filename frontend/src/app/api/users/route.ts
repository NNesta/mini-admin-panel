import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email, role, status } = await request.json();

    const response = await fetch(`${process.env.API_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, role, status }),
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      return NextResponse.json(
        {
          status: response.status,
          message: data?.message || "Unknown error from backend",
        },
        { status: response.status }
      );
    }
    return NextResponse.json(data);
  } catch (error) {
    console.error("Next.js POST /users error:", error);
    return NextResponse.json(
      { message: "Failed to create user", error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const response = await fetch(`${process.env.API_URL}/users`);
    return NextResponse.json({
      status: response.status,
      success: true,
      message: "Users fetched successfully",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    const response = await fetch(`${process.env.API_URL}/users/${id}`, {
      method: "DELETE",
    });
    return NextResponse.json({
      status: response.status,
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const { id, ...data } = await request.json();
    const response = await fetch(`${process.env.API_URL}/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return NextResponse.json({
      status: response.status,
      success: true,
      message: "User updated successfully",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
