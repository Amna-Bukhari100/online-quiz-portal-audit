from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

def test_form_validation(driver):
    driver.get("https://online-quiz-portal-website.onrender.com/register")
    wait = WebDriverWait(driver, 10)

    # Click the submit button
    submit_btn = wait.until(EC.element_to_be_clickable((By.XPATH, "//button[@type='submit']")))
    submit_btn.click()

    # Wait for the page to show any validation text
    validation_text = wait.until(lambda d: "required" in d.page_source or "Please" in d.page_source)

    assert validation_text, "Validation messages not found!"
