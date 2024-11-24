import requests

# BaseRL of your API
BASE_URL = "http://localhost:8000"
def test_health_check():
   response = requests.get(f"{BASE_URL}/")
   print("Health Check Response:", response.json())
def test_process_text():
   payload = {
       "text": "Explain quantum computing in simple terms"
   }
   response = requests.post(f"{BASE_URL}/process-text/", json=payload)
   print("Process Text Response:", response.json())
if __name__ == "__main__":
   test_health_check()
   test_process_text()