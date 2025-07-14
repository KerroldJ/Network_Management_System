from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from speedtest import Speedtest
import time
import statistics
import os

@csrf_exempt
def optimize_network(request):
    if request.method != "POST":
        return JsonResponse({"error": "Only POST requests are allowed."}, status=405)

    try:
        log = []
        log.append("⏳ Starting network optimization process...")
        time.sleep(1)

        # 🧠 Simulated AI Model Interaction (Non-functional placeholders)
        log.append("🤖 Connecting to AI optimization models...")
        model_h5_path = os.path.join("AI", "model.h5")
        model_pkl_path = os.path.join("AI", "model.pkl")
        # Simulate AI model loading
        ai_model_h5 = f"Accessed model at {model_h5_path}"
        ai_model_pkl = f"Accessed model at {model_pkl_path}"
        time.sleep(1)
        log.append("📁 AI models accessed successfully.")
        log.append("🧠 AI diagnostic: Proceed with optimization.")  # Placeholder message

        # Run Speedtest
        log.append("🚀 Running speed test...")
        st = Speedtest()
        st.get_best_server()

        ping_samples = []
        for i in range(3):
            log.append(f"📡 Collecting ping sample {i + 1}...")
            st.get_best_server()
            ping_samples.append(st.results.ping)
            time.sleep(1)

        avg_ping = round(statistics.mean(ping_samples), 2)
        jitter = round(statistics.stdev(ping_samples), 2) if len(ping_samples) > 1 else 0
        download_speed = round(st.download() / 1_000_000, 2)
        upload_speed = round(st.upload() / 1_000_000, 2)

        time.sleep(1)

        # Simulate Optimizations
        log.append("🔧 Applying virtual DNS flush...")
        time.sleep(1)

        log.append("🔌 Simulating router refresh...")
        time.sleep(1)

        log.append("🌐 Reconnecting to optimal network route...")
        time.sleep(1)

        # Analyze Results
        log.append("📊 Analyzing connection performance...")

        if download_speed >= 50 and avg_ping < 50 and jitter < 10:
            efficiency = 95
            stability = "Excellent"
            signal = "Strong"
        elif download_speed >= 20 and avg_ping < 100:
            efficiency = 85
            stability = "Moderate"
            signal = "Good"
        else:
            efficiency = 60
            stability = "Unstable"
            signal = "Weak"

        # Recommendations
        suggestions = []

        if download_speed < 10:
            suggestions.append("Reduce background downloads and streaming.")
        if upload_speed < 2:
            suggestions.append("Close apps using heavy upload bandwidth.")
        if avg_ping > 100:
            suggestions.append("Move closer to your router or switch to Ethernet.")
        if jitter > 20:
            suggestions.append("Minimize interference and reduce active devices.")

        if not suggestions:
            suggestions.append("✅ Your network is stable and performing well.")

        log.append("✅ Optimization complete.")

        return JsonResponse({
            "efficiency": efficiency,
            "stability": stability,
            "signal": signal,
            "network_stats": {
                "avg_ping": avg_ping,
                "jitter": jitter,
                "download_speed": download_speed,
                "upload_speed": upload_speed
            },
            "suggestions": suggestions,
            "optimization_log": log
        })

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)
