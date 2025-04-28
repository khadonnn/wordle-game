import json

def generate_json(input_file, output_file):
    # Đọc dữ liệu từ file văn bản
    with open(input_file, 'r') as f:
        lines = f.readlines()

    # Xử lý dữ liệu
    words = [line.strip() for line in lines]

    # Tạo cấu trúc JSON
    data = {
        "words": words
    }

    # Ghi dữ liệu vào file JSON
    with open(output_file, 'w') as f:
        json.dump(data, f, indent=4)

# Sử dụng function
generate_json('words.txt', '../src/words.json')
