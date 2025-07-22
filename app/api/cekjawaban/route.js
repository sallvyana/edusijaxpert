export async function GET(request) {
  const { searchParams } = request.nextUrl;
  const jawaban = searchParams.get("jawaban");
  const benar = searchParams.get("benar");

  if (jawaban === benar) {
    return new Response("Benar! ✅");
  } else {
    return new Response("Salah! ❌");
  }
}
