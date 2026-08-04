import json
from json import JSONDecodeError
from pathlib import Path


# Start the final object strcture for the fake api
api_resources = {}

# Access the relative path for resource contents
resources_path = Path().absolute().as_posix()


# Load json content from file
def get_resource(name):
    with open(
        resources_path + f"/resources/{name}", 
        "r", 
        encoding = "utf-8"
    ) as json_file:
        return json.load(json_file)

# Iter by the resources JSON files of the folder
# If a empty json content, skip this
print("Building Mock API resources...\n")

for file in Path("resources").iterdir():
    fp = file.name

    try:
        api_resources[fp.replace(".json", "")] =\
            get_resource(fp)
    except JSONDecodeError:
        continue

# Load all resources into db.json
with open(
    resources_path + "/conf/db.json",
    "w", encoding = "utf-8"
) as db_file:
    json.dump(api_resources, db_file, indent = 4)

print("Building fineshed.")