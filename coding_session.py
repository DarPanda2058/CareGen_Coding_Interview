from fastapi import FastAPI
from contextlib import asynccontextmanager
from transformers import pipeline
from pydantic import BaseModel
from typing import List

models = {}

@asynccontextmanager
async def lifespan(app: FastAPI):
    summarization_pipeline = pipeline(
        "summarization",
        model="facebook/bart-large-cnn",
        device= -1)
    models["summarization"] = summarization_pipeline

    classifier_pipeline = pipeline(
        "zero-shot-classification",
        model="facebook/bart-large-mnli",
        device= -1
    )
    models["classifier"] = classifier_pipeline
    yield
    models.clear()


class RequestModel(BaseModel):
    patient_worries: str

class ResponseModel(BaseModel):
    summary: List[str]

app = FastAPI(title = "Coding Session API", lifespan=lifespan)

@app.post("/summarize", response_model=ResponseModel)
async def summarize_text(request: RequestModel):
    summarizer = models["summarization"]
    classifier = models["classifier"]

    finalized_output = []

    input_text = request.patient_worries

    candidate_labels = ["cardiovascular",
                        "respiratory",
                        "gastrointestinal",
                        "neurological",
                        "mental health",
                        "skeletal",
                        "muscular",
                        "general medical issues"]

    summary = summarizer(
        input_text,
        max_length=120,
        min_length=30,
        do_sample=False
    )

    summary_text = summary[0]['summary_text']
    
    summary_sentences = [sentence.strip() for sentence in summary_text.split('.') if sentence.strip()][:3]

    for sentence in summary_sentences:
        classification = classifier(
            sentence,
            candidate_labels=candidate_labels
        )
        finalized_output.append(f"{sentence} - Category: {classification['labels'][0]}")

    # return as the expected model shape
    return {"summary": finalized_output}
