export async function POST(request: Request) {
  const { username, password } = await request.json();
  const options: RequestInit = {
    method: "POST",
    body: JSON.stringify({
      username,
      password,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  };
  // make the request to authenticate the user
  const tokensResponse: SignInResponse = await fetch(
    "https://api.komornikantal.hu/auth/login/",
    options,
  ).then((res) => res.json());

  if ("error" in tokensResponse) {
    // Bad request
    return Response.json(tokensResponse);
  }

  const response = NextResponse.json(tokensResponse, {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });

  // Save the tokens in the cookie response
  response.cookies.set({
    name: "tokens",
    path: "/",
    value: JSON.stringify(tokensResponse),
  });

  return response;
}