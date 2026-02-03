from selenium.webdriver.common.by import By
import time

def test_signup_valid(driver):
    driver.get("https://online-quiz-portal-website.onrender.com/register")

    driver.find_element(By.ID, "name").send_keys("teststudent1234")
    driver.find_element(By.ID, "email").send_keys("teststudent1234@gmail.com")
    driver.find_element(By.ID, "password").send_keys("Test@12345")
    driver.find_element(By.ID, "confirmPassword").send_keys("Test@12345")

    driver.find_element(By.CSS_SELECTOR, "button.primary-contained-btn").click()

    time.sleep(3)
    assert "/login" in driver.current_url
