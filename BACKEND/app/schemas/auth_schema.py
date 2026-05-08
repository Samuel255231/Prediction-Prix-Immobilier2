from pydantic import BaseModel, Field

class UserCreate(BaseModel):
    username: str
    email: str
    password: str = Field(min_length=4, max_length=72)


class UserLogin(BaseModel):
    username: str
    password: str