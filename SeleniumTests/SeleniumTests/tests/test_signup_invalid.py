from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

def test_signup_invalid(driver):
    driver.get("https://online-quiz-portal-website.onrender.com/register")

    driver.find_element(By.ID, "name").send_keys("")
    driver.find_element(By.ID, "email").send_keys("bademail")
    driver.find_element(By.ID, "password").send_keys("123")
    driver.find_element(By.ID, "confirmPassword").send_keys("999")

    driver.find_element(By.CSS_SELECTOR, "button.primary-contained-btn").click()

    # Wait just for page to settle
    WebDriverWait(driver, 5).until(lambda d: True)

    # Check that user is STILL on /register (because signup failed)
    assert "register" in driver.current_url.lower()
