import { validatePreviewUrl } from "@sanity/preview-url-secret";
import { client } from "@/sanity/lib/client";
import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

const token = process.env.SANITY_API_READ_TOKEN as string;
export async function GET(request: NextRequest) {
    const { isValid, redirectTo = "/" } = await validatePreviewUrl(
        client.withConfig({ token }),
        request.url
    );
    if (!isValid) {
        return new Response("Invalid Secret", {
            status: 401,
        });
    }
    (await draftMode()).enable();
    redirect(redirectTo);
}
