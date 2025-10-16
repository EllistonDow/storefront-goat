import { NextRequest, NextResponse } from "next/server";
import { executeGraphQL } from "@/lib/graphql";
import { PasswordChangeDocument } from "@/gql/graphql";

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		const { oldPassword, newPassword } = body;

		const result = await executeGraphQL(PasswordChangeDocument, {
			variables: {
				oldPassword,
				newPassword,
			},
		});

		if (result.passwordChange?.errors?.length) {
			return NextResponse.json(
				{ error: result.passwordChange.errors[0].message },
				{ status: 400 }
			);
		}

		return NextResponse.json({ success: true });
	} catch (error) {
		console.error("Password change error:", error);
		return NextResponse.json(
			{ error: "Failed to change password" },
			{ status: 500 }
		);
	}
}
