# conftest.py
import pytest
from config import get_driver
from utils import take_screenshot

@pytest.fixture
def driver():
    driver = get_driver()
    yield driver  
    driver.quit()

# This hook runs automatically after EACH test
def pytest_runtest_makereport(item, call):
    if call.when == "call":  # Only after test finishes
        driver = item.funcargs.get("driver", None)
        if driver:
            test_name = item.name
            take_screenshot(driver, test_name)
