import os
from generate_cv import build_cv

if __name__ == "__main__":
    out_path = os.path.join(os.path.dirname(__file__), "..", "public", "resume.pdf")
    build_cv(out_path)
    print("Generated resume at:", out_path)
