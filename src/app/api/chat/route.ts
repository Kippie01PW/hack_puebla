//import { GoogleGenerativeAI } from "@google/generative-ai";
//import { NextResponse } from "next/server";

/*export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    // Asegúrate de que tu clave de API esté en una variable de entorno
    // Para Next.js: NEXT_PUBLIC_GEMINI_API_KEY (si se expone públicamente, aunque no es recomendado)
    // O simplemente GEMINI_API_KEY (para uso solo en el servidor)
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
    const model = genAI.getGenerativeModel({ model:'gemini-1.5-flash'});

    const result = await model.generateContent(message);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ text });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error al comunicarse con la API de Gemini" },
      { status: 500 }
    );
  }
}*/




import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(message);
    const reply = result.response.text();

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Error en Gemini API:", error);
    return NextResponse.json(
      { reply: "Error al comunicarse con Gemini." },
      { status: 500 }
    );
  }
}



