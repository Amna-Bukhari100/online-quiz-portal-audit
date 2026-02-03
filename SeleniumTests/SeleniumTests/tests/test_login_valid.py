from selenium.webdriver.common.by import By
import time

def test_login_valid(driver):
    driver.get("https://online-quiz-portal-website.onrender.com/login")

    driver.find_element(By.ID, "email").send_keys("teststudent@gmail.com")
    driver.find_element(By.ID, "password").send_keys("Test@123")
    driver.find_element(By.CSS_SELECTOR, "button.primary-contained-btn").click()

    time.sleep(3)
    assert "/home" in driver.current_url
