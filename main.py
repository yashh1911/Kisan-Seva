from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from services.gemini import diagnose_crop, analyze_market, general_query
from services.market import fetch_market_prices



app = FastAPI(title="Project Kisan API")



app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # for now allow all
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"status": "Project Kisan backend is running!"}


@app.post("/diagnose")
async def diagnose(
    file: UploadFile = File(...),
    language: str = Form(default="English")
):
    allowed_types = ["image/jpeg", "image/png", "image/webp", "image/jpg"]
    if file.content_type not in allowed_types:
        raise HTTPException(status_code=400, detail="Only JPEG/PNG/WebP images allowed")

    image_bytes = await file.read()

    if len(image_bytes) > 10 * 1024 * 1024:
        raise HTTPException(status_code=400, detail="Image too large. Max 10MB.")

    try:
        result = await diagnose_crop(image_bytes, file.content_type, language)
        return {"diagnosis": result}
    except Exception as e:
        raise HTTPException(status_code=503, detail=str(e))


class MarketRequest(BaseModel):
    crop: str
    state: str = None
    language: str = "English"


@app.post("/market")
async def market_prices(req: MarketRequest):
    if not req.crop.strip():
        raise HTTPException(status_code=400, detail="Crop name cannot be empty")
    try:
        market_data = await fetch_market_prices(req.crop, req.state)
        analysis = await analyze_market(req.crop, market_data, req.language)
        return {"raw_data": market_data, "analysis": analysis}
    except Exception as e:
        raise HTTPException(status_code=503, detail=str(e))


class QueryRequest(BaseModel):
    question: str
    language: str = "English"


@app.post("/query")
async def query(req: QueryRequest):
    if not req.question.strip():
        raise HTTPException(status_code=400, detail="Question cannot be empty")

    # 🔒 Restrict to agriculture only
    keywords = [
        "crop", "farming", "soil", "fertilizer", "irrigation",
        "plant", "disease", "pest", "wheat", "rice", "maize",
        "farmer", "agriculture", "harvest"
    ]

    if not any(word in req.question.lower() for word in keywords):
        return {"answer": "Please ask only crop or farming-related questions."}

    try:
        answer = await general_query(req.question, req.language)
        return {"answer": answer}
    except Exception as e:
        print("ERROR:", e)
        raise HTTPException(status_code=503, detail=str(e))