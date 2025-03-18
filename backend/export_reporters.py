import json
from reporters_db import REPORTERS
import datetime

def default_converter(o):
    if isinstance(o, datetime.datetime):
        return o.isoformat()
    raise TypeError(f"Object of type {o.__class__.__name__} is not JSON serializable")

with open("reporters_export.json", "w") as f:
    json.dump(REPORTERS, f, indent=2, default=default_converter)
