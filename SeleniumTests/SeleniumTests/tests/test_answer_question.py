from selenium.webdriver.common.by import By
import time

def test_answer_question(driver):
    driver.get("https://online-quiz-portal-website.onrender.com/login")

    driver.find_element(By.ID, "email").send_keys("teststudent@gmail.com")
    driver.find_element(By.ID, "password").send_keys("Test@123")
    driver.find_element(By.CSS_SELECTOR, "button.primary-contained-btn").click()
    time.sleep(2)

    driver.find_element(By.CSS_SELECTOR, "button.primary-outlined-btn").click()
    time.sleep(2)

    driver.find_element(By.CSS_SELECTOR, "button.primary-contained-btn").click()
    time.sleep(2)

    options = driver.find_elements(By.CSS_SELECTOR, ".option")
    assert len(options) > 0

    options[0].click()
    time.sleep(1)

    driver.find_element(By.CSS_SELECTOR, "button.primary-contained-btn").click()
    time.sleep(2)

    next_question = driver.find_elements(By.CSS_SELECTOR, ".option")
    assert len(next_question) > 0 or "result" in driver.current_url
