import { redirect } from "next/navigation";

// interface PageProps {
//   params: Promise<{
//     slug: string;    
//   }>;
// }

export default async function CertifyPage(
//    { params }: PageProps
) {
    // const resolvedParams    = await params;
    // const { slug }          = resolvedParams;
    
    return redirect('/kho-de-thi')
}