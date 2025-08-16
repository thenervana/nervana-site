export async function POST(req) {
  const { email } = await req.json();

  if (!email || !email.includes('@')) {
    return Response.json({ message: 'Invalid email address' }, { status: 400 });
  }

  try {
    const response = await fetch('https://script.google.com/macros/s/AKfycbzwVYtRvwnqHwDuDCVsFv0y4mL_qKx1VfKmp3K7DNJ1FQAL1MCcWtXwBQrAmpR_CALX/exec', {
      method: 'POST',
      body: JSON.stringify({ email }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result = await response.json();

    if (result.status === 'success') {
      return Response.json({ message: 'Subscribed successfully' }, { status: 200 });
    } else {
      return Response.json({ message: result.message || 'Failed to subscribe' }, { status: 500 });
    }
  } catch (err) {
    return Response.json({ message: 'Server error' }, { status: 500 });
  }
}