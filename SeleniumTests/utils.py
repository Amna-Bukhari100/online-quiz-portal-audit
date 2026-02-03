# utils.py
import os
from datetime import datetime

def take_screenshot(driver, test_name):
    # Create folder if missing
    if not os.path.exists("screenshots"):
        os.makedirs("screenshots")

    # Timestamp + test name → unique filename
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    filename = f"screenshots/{test_name}_{timestamp}.png"

    driver.save_screenshot(filename)
    return filename
