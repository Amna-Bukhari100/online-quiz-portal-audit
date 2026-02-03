from selenium.webdriver.common.by import By
import time

def test_open_quiz(driver):
    driver.get("https://online-quiz-portal-website.onrender.com/login")

    driver.find_element(By.ID, "email").send_keys("teststudent@gmail.com")
    driver.find_element(By.ID, "password").send_keys("Test@123")
    driver.find_element(By.CSS_SELECTOR, "button.primary-contained-btn").click()
    time.sleep(2)

    driver.find_element(By.CSS_SELECTOR, "button.primary-outlined-btn").click()
    time.sleep(2)

    assert "/user/write-exam" in driver.current_url
