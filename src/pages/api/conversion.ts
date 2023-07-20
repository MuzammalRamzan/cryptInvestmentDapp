import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST")
    return res.status(405).json({ message: "Method not allowed" });
  try {
    const config = {
      method: "POST",
      body: JSON.stringify(req.body),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };
    const resposne = await fetch(
      "https://api.improvely.com/v1/conversion.json",
      config
    );
    const data = await resposne.json();
    console.log({ data });
    res.status(200).json({ ...data });
  } catch (e) {
    console.log({ e });
    res.status(400).json({ message: "Failed" });
  }
}

export const config = {
  api: {
    bodyParser: true,
  },
};
