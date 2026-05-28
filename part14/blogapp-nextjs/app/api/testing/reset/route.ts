import { NextResponse } from "next/server";

import { db } from "@/db";
import { blogs, readingLists, users } from "@/db/schema";

export async function DELETE() {
  if (process.env.ENABLE_TEST_ENDPOINTS !== "true") {
    return NextResponse.json(
      { error: "This endpoint is not available" },
      { status: 403 },
    );
  }

  await db.delete(readingLists);

  await db.delete(blogs);

  await db.delete(users);

  return NextResponse.json({
    message: "Database reset successfully",
  });
}
