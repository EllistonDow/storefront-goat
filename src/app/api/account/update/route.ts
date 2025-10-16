import { NextRequest, NextResponse } from "next/server";
import { executeGraphQL } from "@/lib/graphql";
import { AccountUpdateDocument } from "@/gql/graphql";

interface AccountUpdateRequest {
	firstName: string | null;
	lastName: string | null;
}

export async function POST(request: NextRequest) {
	try {
		const body = await request.json() as AccountUpdateRequest;
		const { firstName, lastName } = body;

		const result = await executeGraphQL(AccountUpdateDocument, {
			variables: {
				input: {
					firstName: firstName || null,
					lastName: lastName || null,
				},
			},
		});

		if (result.accountUpdate?.errors?.length) {
			return NextResponse.json(
				{ error: result.accountUpdate.errors[0].message },
				{ status: 400 }
			);
		}

		return NextResponse.json({ success: true });
	} catch (error) {
		console.error("Account update error:", error);
		return NextResponse.json(
			{ error: "Failed to update account" },
			{ status: 500 }
		);
	}
}
