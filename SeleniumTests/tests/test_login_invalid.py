from selenium.webdriver.common.by import By
import time

def test_login_invalid(driver):
    driver.get("https://online-quiz-portal-website.onrender.com/login")

    driver.find_element(By.ID, "email").send_keys("wrong@gmail.com")
    driver.find_element(By.ID, "password").send_keys("WrongPass123")
    driver.find_element(By.CSS_SELECTOR, "button.primary-contained-btn").click()

    time.sleep(2)
    assert "/login" in driver.current_url
